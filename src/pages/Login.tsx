
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PawPrint, User, Key, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import LoginInfo from '@/components/LoginInfo';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginOption, setLoginOption] = useState<'user' | 'admin'>('user');
  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: loginOption === 'admin' ? 'admin' : 'user',
      password: loginOption === 'admin' ? 'admin123' : 'user123',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.username, data.password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const setLoginType = (type: 'user' | 'admin') => {
    setLoginOption(type);
    // Update form values when login type changes
    form.setValue('username', type === 'admin' ? 'admin' : 'user');
    form.setValue('password', type === 'admin' ? 'admin123' : 'user123');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 paw-print-bg">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-pawtrack-blue to-pawtrack-blue-dark rounded-full p-4 mb-6 shadow-lg animate-bounce-slow">
            <PawPrint className="h-14 w-14 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome to PawTrack</h2>
          <p className="text-gray-600 text-center max-w-xs">The perfect companion for all your pet care needs</p>
        </div>
        
        {/* Login info with credentials - styled */}
        <div className="mb-6">
          <LoginInfo />
        </div>

        <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-md rounded-xl overflow-hidden">
          <CardHeader className="pb-2 bg-gradient-to-r from-pawtrack-blue/10 to-pawtrack-blue-dark/10 border-b border-gray-100">
            <CardTitle className="text-xl font-medium text-pawtrack-blue">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex rounded-md overflow-hidden border border-gray-200 shadow-sm">
                <button 
                  className={`flex-1 py-3 text-center transition-all duration-300 ${loginOption === 'user' ? 'bg-gradient-to-r from-pawtrack-blue to-pawtrack-blue-dark text-white font-medium' : 'bg-gray-50 text-gray-600'}`}
                  onClick={() => setLoginType('user')}
                  type="button"
                >
                  User
                </button>
                <button 
                  className={`flex-1 py-3 text-center transition-all duration-300 ${loginOption === 'admin' ? 'bg-gradient-to-r from-pawtrack-blue to-pawtrack-blue-dark text-white font-medium' : 'bg-gray-50 text-gray-600'}`}
                  onClick={() => setLoginType('admin')}
                  type="button"
                >
                  Administrator
                </button>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Enter your username" 
                            className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-pawtrack-blue focus:ring-2 focus:ring-pawtrack-blue/20" 
                            {...field}
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="pl-10 pr-10 py-6 bg-gray-50 border-gray-200 focus:border-pawtrack-blue focus:ring-2 focus:ring-pawtrack-blue/20" 
                            {...field}
                          />
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            tabIndex={-1}
                          >
                            {showPassword ? 
                              <EyeOff className="w-5 h-5" /> : 
                              <Eye className="w-5 h-5" />
                            }
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-pawtrack-blue to-pawtrack-blue-dark hover:from-pawtrack-blue-dark hover:to-pawtrack-blue transition-all duration-300 shadow-md hover:shadow-lg py-7 mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center font-medium text-base">
                      Sign In as {loginOption === 'admin' ? 'Administrator' : 'User'}
                    </span>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <a 
                    href="#" 
                    className="text-sm text-pawtrack-blue hover:text-pawtrack-blue-dark hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 border-t pt-4 bg-gray-50/50">
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-pawtrack-blue hover:text-pawtrack-blue-dark hover:underline transition-colors">
                Create an account
              </Link>
            </p>
            <Link to="/" className="text-sm text-center text-gray-500 hover:text-gray-700 hover:underline transition-colors">
              Back to home
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PawTrack. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
