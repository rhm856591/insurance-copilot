'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication - replace with actual auth
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 md:p-4 overflow-hidden">
      {/* Animated Particles Background */}
      <ParticlesBackground
        backgroundColor="#0a0a1a"
        gradientColor1="rgba(59, 130, 246, 0.15)"
        gradientColor2="rgba(147, 51, 234, 0.15)"
        particleColor="147, 197, 253"
        overlayGradientFrom="rgba(10, 10, 26, 0.8)"
        noiseOpacity="opacity-10"
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8 animate-slideUp">
        {/* Decorative gradient top */}
        {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl" /> */}

        <div className="text-center mb-6 md:mb-8 mt-2">
          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-3xl md:text-4xl font-bold tracking-wide">
              AI
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Insurance AI Copilot
          </h1>
          <p className="text-gray-600 mt-2 text-sm">Your intelligent assistant for life insurance</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@insurance.com"
                className="w-full pl-11 pr-4 py-3 md:py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-12 py-3 md:py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors active:scale-95 z-10 p-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs md:text-sm">
            {/* <label className="flex items-center cursor-pointer gap-2">
              <input 
                type="checkbox" 
                className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer flex-shrink-0" 
              />
              <span className="text-gray-600 select-none">Remember me</span>
            </label> */}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full py-3 min-h-[48px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 transition-all"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs md:text-sm">
              <span className="px-3 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center px-3 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all min-h-[48px] bg-white"
            >
              <span className="text-xs md:text-sm font-medium text-gray-700">Azure AD</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-3 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all min-h-[48px] bg-white"
            >
              <span className="text-xs md:text-sm font-medium text-gray-700">Okta SSO</span>
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <Lock size={12} />
            Protected by Multi-Factor Authentication
          </p>
        </div>
      </div>

      {/* Floating elements for decoration */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}
