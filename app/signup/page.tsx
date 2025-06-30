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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import Link from "next/link";

type VerificationMethod = "email" | "phone";
type SignupStep = "details" | "verification" | "password";



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


const Signup = () => {
  const [step, setStep] = useState<SignupStep>("details");
  const [verificationMethod, setVerificationMethod] =
    useState<VerificationMethod>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("verification");
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("password");
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Signup completed:", formData);
    }, 1000);
  };

  const renderDetailsStep = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendOTP();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
          className="h-11 bg-white border-0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
          className="h-11 bg-white border-0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
          className="h-11 bg-white border-0"
        />
      </div>

      <div className="space-y-3">
        <Label>Verification Method</Label>
        <div className="flex space-x-4">
          <Button
            type="button"
            variant={verificationMethod === "email" ? "default" : "outline"}
            className={`flex-1 h-11 bg-white ${verificationMethod === "email" && "bg-blue-200 border border-blue-600"}`}
            onClick={() => setVerificationMethod("email")}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          <Button
            type="button"
            variant={verificationMethod === "phone" ? "default" : "outline"}
            className={`flex-1 h-11 bg-white ${verificationMethod === "phone" && "bg-blue-200 border border-blue-600"}`}
            onClick={() => setVerificationMethod("phone")}
          >
            <Phone className="w-4 h-4 mr-2" />
            Phone
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full sm:w-auto h-12 px-8 mt-2 sm:mt-0 bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 hover:from-electric-600 hover:to-amber-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/30 animate-pulse-glow flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? "Sending OTP..." : "Send Verification Code"}
      </Button>
    </form>
  );

  const renderVerificationStep = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          We&apos;ve sent a verification code to your {verificationMethod}:
        </p>
        <p className="font-medium text-gray-900">
          {verificationMethod === "email" ? formData.email : formData.phone}
        </p>
      </div>

      <div className="space-y-2">
        <Label>Enter Verification Code</Label>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={formData.otp}
            onChange={(value) => handleInputChange("otp", value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <Button
        onClick={handleVerifyOTP}
        className="w-full h-11 bg-green-600 hover:bg-green-700"
        disabled={isLoading || formData.otp.length !== 6}
      >
        {isLoading ? "Verifying..." : "Verify Code"}
      </Button>

      <div className="text-center">
        <Button
          type="button"
          variant="ghost"
          className="text-sm text-green-600 hover:text-green-700"
          onClick={() => setStep("details")}
        >
          Change {verificationMethod} or go back
        </Button>
      </div>
    </div>
  );

  const renderPasswordStep = () => (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
            className="h-11 pr-10 bg-white"
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            required
            className="h-11 pr-10 bg-white"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold text-base"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );

  const getStepTitle = () => {
    switch (step) {
      case "details":
        return "Create Your Account";
      case "verification":
        return "Verify Your Account";
      case "password":
        return "Set Your Password";
      default:
        return "Sign Up";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "details":
        return "Enter your details to get started";
      case "verification":
        return "We need to verify your identity";
      case "password":
        return "Choose a secure password for your account";
      default:
        return "";
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-electric-100 to-lime-100 overflow-hidden flex items-center justify-center">
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
            <CardTitle className="text-2xl font-semibold text-center">
              {getStepTitle()}
            </CardTitle>
            <CardDescription className="text-center">
              {getStepDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "details" && renderDetailsStep()}
            {step === "verification" && renderVerificationStep()}
            {step === "password" && renderPasswordStep()}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-gradient hover:font-semibold font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-gradient hover:font-semibold ">
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

export default Signup;
