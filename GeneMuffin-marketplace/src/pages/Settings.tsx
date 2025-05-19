import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertCircle, 
  User, 
  Wallet, 
  Bell, 
  Shield, 
  Settings as SettingsIcon,
  Key,
  Download,
  Trash
} from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [dataDeleteConfirm, setDataDeleteConfirm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-400">
            Manage your account preferences and wallet settings
          </p>
        </div>
        
        <Card className="bg-black border border-gray-800 overflow-hidden mb-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full border-b border-gray-800 bg-black rounded-none">
              <TabsTrigger 
                value="account" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Account
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="wallet" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                <span className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Wallet
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                <span className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6 p-0 m-0 mt-0">
              <Card className="bg-black border-0 border-t border-gray-800 shadow-none rounded-none">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-xl text-white">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-gray-400">First name</Label>
                        <Input 
                          id="first-name" 
                          defaultValue="John" 
                          className="bg-gray-900/50 border-gray-800 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-gray-400">Last name</Label>
                        <Input 
                          id="last-name" 
                          defaultValue="Doe" 
                          className="bg-gray-900/50 border-gray-800 focus-visible:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-400">Email address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="john.doe@example.com" 
                        className="bg-gray-900/50 border-gray-800 focus-visible:ring-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-400">Username</Label>
                      <Input 
                        id="username" 
                        defaultValue="johndoe" 
                        className="bg-gray-900/50 border-gray-800 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <Button className="bg-primary hover:bg-primary/90 text-black">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-0 border-t border-gray-800 shadow-none rounded-none">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-xl text-white">Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-800 overflow-hidden border-2 border-gray-700">
                      <img 
                        src="/images/WhiteMuffin-male.jpeg" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        <Button 
                          variant="black" 
                          className="text-gray-300 hover:text-white transition-all duration-200"
                        >
                          Change Photo
                        </Button>
                        <Button variant="ghost" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                          Remove
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="wallet" className="p-0 m-0 mt-0">
              <Card className="bg-black border-0 border-t border-gray-800 shadow-none rounded-none">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-xl text-white">Wallet Settings</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="p-4 bg-blue-950/30 border border-blue-900/50 rounded-lg mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-900/30 border border-blue-800/50 flex items-center justify-center mr-3">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                          alt="MetaMask" 
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-200">MetaMask Connected</p>
                        <p className="text-sm text-gray-400">0x7F5E...8A1D</p>
                      </div>
                    </div>
                    <Button 
                      variant="black" 
                      className="text-gray-300 hover:text-white transition-all duration-200"
                    >
                      Disconnect
                    </Button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Auto-connect wallet</h3>
                        <p className="text-sm text-gray-400">Automatically connect your wallet when you visit the site</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Transaction notifications</h3>
                        <p className="text-sm text-gray-400">Receive notifications for wallet transactions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Price alerts</h3>
                        <p className="text-sm text-gray-400">Get notified of significant price changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <Button className="bg-primary hover:bg-primary/90 text-black">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="p-0 m-0 mt-0">
              <Card className="bg-black border-0 border-t border-gray-800 shadow-none rounded-none">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-xl text-white">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Email notifications</h3>
                        <p className="text-sm text-gray-400">Receive email updates about your account and purchases</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Marketplace updates</h3>
                        <p className="text-sm text-gray-400">Get notified about new listings and price changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Data access requests</h3>
                        <p className="text-sm text-gray-400">Be alerted when someone requests access to your data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Marketing communications</h3>
                        <p className="text-sm text-gray-400">Occasional updates about new features and promotions</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="p-0 m-0 mt-0">
              <Card className="bg-black border-0 border-t border-gray-800 shadow-none rounded-none">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-xl text-white">Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Two-factor authentication</h3>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Data sharing consent</h3>
                        <p className="text-sm text-gray-400">Allow anonymized data to be used for research</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Activity log</h3>
                        <p className="text-sm text-gray-400">Keep a record of all actions taken on your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-200">Public profile</h3>
                        <p className="text-sm text-gray-400">Make your profile visible to other marketplace users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-200 mb-4">Account Actions</h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      variant="black"
                      className="flex items-center justify-start gap-3 text-gray-300 hover:text-white transition-all duration-200"
                    >
                      <div className="bg-blue-900/20 p-2 rounded-full">
                        <Key size={16} className="text-blue-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Change Password</p>
                        <p className="text-xs text-gray-500">Update your account password</p>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="black"
                      className="flex items-center justify-start gap-3 text-gray-300 hover:text-white transition-all duration-200"
                    >
                      <div className="bg-green-900/20 p-2 rounded-full">
                        <Download size={16} className="text-green-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Download My Data</p>
                        <p className="text-xs text-gray-500">Get a copy of all your account data</p>
                      </div>
                    </Button>
                    
                    {!showDeleteConfirm ? (
                      <Button 
                        variant="black"
                        className="flex items-center justify-start gap-3 text-red-400 hover:text-red-300 transition-all duration-200"
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        <div className="bg-red-900/20 p-2 rounded-full">
                          <Trash size={16} className="text-red-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Delete Account</p>
                          <p className="text-xs text-red-500/80">Permanently remove your account</p>
                        </div>
                      </Button>
                    ) : (
                      <div className="p-4 border border-red-900/50 rounded-lg bg-red-950/10">
                        <div className="flex items-start gap-3 mb-3">
                          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-red-400 text-sm mb-2">
                              This action is irreversible. Please type "delete" to confirm.
                            </p>
                            <Input 
                              value={dataDeleteConfirm}
                              onChange={(e) => setDataDeleteConfirm(e.target.value)}
                              placeholder="Type 'delete' to confirm"
                              className="mb-3 bg-red-950/10 border-red-900/30 text-red-400"
                            />
                            <div className="flex gap-2">
                              <Button 
                                variant="destructive" 
                                disabled={dataDeleteConfirm !== 'delete'}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Confirm Delete
                              </Button>
                              <Button 
                                variant="outline" 
                                className="border-gray-700 text-gray-300"
                                onClick={() => {
                                  setShowDeleteConfirm(false);
                                  setDataDeleteConfirm('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default Settings;
