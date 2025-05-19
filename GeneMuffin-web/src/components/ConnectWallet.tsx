
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Wallet, ExternalLink, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ConnectWallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  // Check if ethereum is available in the window object
  const checkIfWalletIsConnected = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window;
      if (!ethereum) {
        return false;
      }
      
      // Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        setWalletAddress(account);
        setIsConnected(true);
        // Get provider info to determine wallet type
        // @ts-ignore
        if (ethereum.isMetaMask) {
          setWalletType("MetaMask");
        // @ts-ignore
        } else if (ethereum.isCoinbaseWallet) {
          setWalletType("Coinbase Wallet");
        } else {
          setWalletType("Connected Wallet");
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking if wallet is connected:", error);
      return false;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const handleConnect = async (provider: string) => {
    setIsConnecting(true);
    
    try {
      let accounts: string[] = [];
      // @ts-ignore
      const { ethereum } = window;
      
      if (!ethereum && provider === "MetaMask") {
        toast({
          title: "MetaMask not installed",
          description: "Please install MetaMask to connect your wallet",
          variant: "destructive",
        });
        setIsConnecting(false);
        return;
      }
      
      // Request account access
      try {
        accounts = await ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        toast({
          title: "Connection Rejected",
          description: "You rejected the connection request",
          variant: "destructive",
        });
        setIsConnecting(false);
        return;
      }
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletType(provider);
        setIsConnected(true);
        setIsOpen(false);
        
        toast({
          title: "Wallet Connected",
          description: `Successfully connected to ${provider}`,
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    setWalletType("");
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setIsCopied(true);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const viewOnExplorer = () => {
    // Default to Ethereum mainnet, but this can be modified based on the connected chain
    const explorerUrl = `https://etherscan.io/address/${walletAddress}`;
    window.open(explorerUrl, "_blank");
  };

  return (
    <>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-lg bg-gene-light text-gene-primary border-gene-primary hover:bg-gene-light/90"
            >
              <Wallet size={16} />
              {formatWalletAddress(walletAddress)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{walletType}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {formatWalletAddress(walletAddress)}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Copy Address</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={viewOnExplorer} className="cursor-pointer">
              <ExternalLink className="mr-2 h-4 w-4" />
              <span>View on Explorer</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer text-red-500 focus:text-red-500">
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="flex items-center gap-2 rounded-lg border-gene-primary text-gene-primary hover:bg-gene-primary/10"
        >
          <Wallet size={16} />
          Connect Wallet
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gene-accent border-gene-muted">
          <DialogHeader>
            <DialogTitle className="text-gene-dark">Connect Wallet</DialogTitle>
            <DialogDescription className="text-gene-dark/70">
              Choose your preferred wallet to connect with GeneMuffin.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              onClick={() => handleConnect("MetaMask")}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-gene-primary to-gene-secondary hover:opacity-95 text-white"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <div className="animate-pulse">Connecting...</div>
              ) : (
                <>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    alt="MetaMask"
                    className="w-5 h-5"
                  />
                  Connect with MetaMask
                </>
              )}
            </Button>
            <Button
              onClick={() => handleConnect("WalletConnect")}
              className="flex items-center justify-center gap-2 w-full bg-gene-light text-gene-dark border border-gene-primary/20 hover:bg-gene-light/90"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <div className="animate-pulse">Connecting...</div>
              ) : (
                <>
                  <img
                    src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                    alt="WalletConnect"
                    className="w-5 h-5"
                  />
                  Connect with WalletConnect
                </>
              )}
            </Button>
            <Button
              onClick={() => handleConnect("Coinbase Wallet")}
              className="flex items-center justify-center gap-2 w-full bg-gene-secondary hover:opacity-95 text-gene-dark"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <div className="animate-pulse">Connecting...</div>
              ) : (
                <>
                  <img
                    src="https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png"
                    alt="Coinbase Wallet"
                    className="w-5 h-5"
                  />
                  Connect with Coinbase
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
