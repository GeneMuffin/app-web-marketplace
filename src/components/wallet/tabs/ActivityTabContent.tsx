
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { mockTransactions } from '../WalletTypes';

const ActivityTabContent: React.FC = () => {
  return (
    <div className="p-3">
      {mockTransactions.map((tx, index) => (
        <div key={index} className="mb-3 p-3 bg-[#1A1F2C]/40 rounded-lg border border-gray-700/50">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">{tx.type}</span>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">{tx.status}</span>
          </div>
          <div className="flex items-center text-xs text-gray-400 gap-2 mb-2">
            <span>{tx.hash}</span>
            <button className="text-gray-400 hover:text-white">
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">{tx.amount}</span>
            <span className="text-xs text-gray-400">{tx.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTabContent;
