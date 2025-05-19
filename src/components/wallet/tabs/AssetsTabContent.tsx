
import React from 'react';
import { mockTokens } from '../WalletTypes';

const AssetsTabContent: React.FC = () => {
  return (
    <div className="p-3">
      {mockTokens.map((token, index) => (
        <div key={index} className="flex justify-between items-center p-2 hover:bg-[#1A1F2C]/50 rounded-lg transition-colors">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center text-xs font-bold ${
              token.symbol === 'ETH' ? 'bg-blue-500/20 text-blue-400' :
              token.symbol === 'GENE' ? 'bg-purple-500/20 text-purple-400' : 
              'bg-green-500/20 text-green-400'
            }`}>
              {token.symbol.substring(0, 2)}
            </div>
            <div>
              <p className="text-sm font-medium">{token.name}</p>
              <p className="text-xs text-gray-400">{token.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{token.balance}</p>
            <p className="text-xs text-gray-400">{token.usdValue}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetsTabContent;
