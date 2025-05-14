
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LockKeyhole } from 'lucide-react';

const LoginInfo: React.FC = () => {
  return (
    <Card className="mb-6 border border-blue-100 shadow-md bg-blue-50/70 backdrop-blur-sm">
      <CardHeader className="pb-2 flex flex-row items-center gap-2">
        <div className="bg-blue-100 p-1.5 rounded-full">
          <LockKeyhole className="h-4 w-4 text-pawtrack-blue" />
        </div>
        <div>
          <CardTitle className="text-lg text-pawtrack-blue"> Credentials</CardTitle>
          <CardDescription>Use any of these accounts to log in</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-blue-100">
            <h3 className="font-medium text-sm text-pawtrack-blue mb-1">User Account:</h3>
            <p className="text-xs text-gray-600">Email: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-700">user</span></p>
            <p className="text-xs text-gray-600">Password: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-700">user123</span></p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-blue-100">
            <h3 className="font-medium text-sm text-pawtrack-blue mb-1">Admin Account:</h3>
            <p className="text-xs text-gray-600">Email: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-700">admin</span></p>
            <p className="text-xs text-gray-600">Password: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-700">admin123</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginInfo;
