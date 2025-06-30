'use client';

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";


interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  shape: 'circle' | 'square' | 'triangle' | 'pentagon';
}


const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login attempt:", { emailOrPhone, password });
    }, 1000);
  };

  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
    useEffect(() => {
      const colors = ['#ef4444', '#3b82f6', '#fbbf24', '#10b981', '#8b5cf6', '#f97316'];
      const shapes: ('circle' | 'square' | 'triangle' | 'pentagon')[] = ['circle', 'square', 'triangle', 'pentagon'];
      
      const initialBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 60 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 5,
        speedY: (Math.random() - 0.5) * 5,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      }));
  
      setBubbles(initialBubbles);
  
      const animateBubbles = () => {
        setBubbles(prevBubbles => 
          prevBubbles.map(bubble => {
            let newX = bubble.x + bubble.speedX;
            let newY = bubble.y + bubble.speedY;
            let newSpeedX = bubble.speedX;
            let newSpeedY = bubble.speedY;
  
            // Bounce off walls
            if (newX <= 0 || newX >= window.innerWidth - bubble.size) {
              newSpeedX = -newSpeedX;
              newX = Math.max(0, Math.min(newX, window.innerWidth - bubble.size));
            }
            if (newY <= 0 || newY >= window.innerHeight - bubble.size) {
              newSpeedY = -newSpeedY;
              newY = Math.max(0, Math.min(newY, window.innerHeight - bubble.size));
            }
  
            return {
              ...bubble,
              x: newX,
              y: newY,
              speedX: newSpeedX,
              speedY: newSpeedY
            };
          })
        );
      };
  
      const interval = setInterval(animateBubbles, 16);
      return () => clearInterval(interval);
    }, []);
  
    const getShapeStyle = (bubble: Bubble) => {
      const baseStyle = {
        position: 'absolute' as const,
        left: bubble.x,
        top: bubble.y,
        width: bubble.size,
        height: bubble.size,
        backgroundColor: bubble.color,
        opacity: 0.7,
        transition: 'all 0.016s linear'
      };
  
      switch (bubble.shape) {
        case 'circle':
          return { ...baseStyle, borderRadius: '50%' };
        case 'square':
          return { ...baseStyle, borderRadius: '0' };
        case 'triangle':
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            width: 0,
            height: 0,
            borderLeft: `${bubble.size / 2}px solid transparent`,
            borderRight: `${bubble.size / 2}px solid transparent`,
            borderBottom: `${bubble.size}px solid ${bubble.color}`
          };
        case 'pentagon':
          return { ...baseStyle, borderRadius: '20%', transform: 'rotate(45deg)' };
        default:
          return { ...baseStyle, borderRadius: '50%' };
      }
    };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-electric-100 to-lime-100 overflow-hidden flex items-center justify-center">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            style={getShapeStyle(bubble)}
          />
        ))}
      </div>
      <div className="w-full max-w-md">
        <Card className="shadow border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-gradient">
              Sign In
            </CardTitle>
            <CardDescription >
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="emailOrPhone"
                  type="text"
                  placeholder="Enter email or phone number"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                  className="h-11 bg-white border-0"
                />
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10 bg-white border-0"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-gradient hover:font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto h-12 px-8 mt-2 sm:mt-0 bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 hover:from-electric-600 hover:to-amber-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/30 animate-pulse-glow flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-gradient hover:font-bold font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-gradient hover:font-semibold">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-gradient hover:font-semibold">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
