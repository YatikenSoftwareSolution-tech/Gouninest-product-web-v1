"use client";
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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { fetchApi } from "@/utils/fetchApi";
import { User } from "@/types/types";
import { useGlobal } from "@/context/GlobalContext";
import { useRouter, useSearchParams } from "next/navigation";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  shape: "circle" | "square" | "triangle" | "pentagon";
}

const Signup = () => {
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { setUser } = useGlobal();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const colors = [
      "#ef4444",
      "#3b82f6",
      "#fbbf24",
      "#10b981",
      "#8b5cf6",
      "#f97316",
    ];
    const shapes: ("circle" | "square" | "triangle" | "pentagon")[] = [
      "circle",
      "square",
      "triangle",
      "pentagon",
    ];

    const initialBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 60 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 5,
      speedY: (Math.random() - 0.5) * 5,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    setBubbles(initialBubbles);

    const animateBubbles = () => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
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
            newY = Math.max(
              0,
              Math.min(newY, window.innerHeight - bubble.size)
            );
          }

          return {
            ...bubble,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        })
      );
    };

    const interval = setInterval(animateBubbles, 16);
    return () => clearInterval(interval);
  }, []);

  const getShapeStyle = (bubble: Bubble) => {
    const baseStyle = {
      position: "absolute" as const,
      left: bubble.x,
      top: bubble.y,
      width: bubble.size,
      height: bubble.size,
      backgroundColor: bubble.color,
      opacity: 0.7,
      transition: "all 0.016s linear",
    };

    switch (bubble.shape) {
      case "circle":
        return { ...baseStyle, borderRadius: "50%" };
      case "square":
        return { ...baseStyle, borderRadius: "0" };
      case "triangle":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          width: 0,
          height: 0,
          borderLeft: `${bubble.size / 2}px solid transparent`,
          borderRight: `${bubble.size / 2}px solid transparent`,
          borderBottom: `${bubble.size}px solid ${bubble.color}`,
        };
      case "pentagon":
        return {
          ...baseStyle,
          borderRadius: "20%",
          transform: "rotate(45deg)",
        };
      default:
        return { ...baseStyle, borderRadius: "50%" };
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    setError(null);

    if (!formData.phone || !formData.name) {
      setError("Name and Phone number is required.");
      setIsLoading(false);
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      setError("Password and Confirm Password is required.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetchApi("/auth/send-otp", {
        method: "POST",
        data: { identifier: formData.phone },
      });
      if (response) setStep(2);
    } catch {
      setError(
        `Failed to send OTP. Check number, country code and Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchApi("/auth/verify-otp", {
        method: "POST",
        data: { identifier: formData.phone, otp: formData.otp },
      });
      if (response) {
        try {
          const signingup = await fetchApi("/auth/register", {
            method: "POST",
            data: {
              name: formData.name,
              identifier: formData.phone,
              password: formData.password,
            },
          });
          if (
            signingup &&
            typeof signingup === "object" &&
            "user" in signingup &&
            signingup.user
          ) {
            setUser(signingup.user as User);
            if ("token" in signingup && typeof signingup.token === "string") {
              localStorage.setItem("gouninest-token", signingup.token);
            }
            if (searchParams.get("booking") === "true") {
              router.push("/booking");
            } else {
              router.push("/");
            }
          }
        } catch {
          setError(`Something went wrong. Please try again.`);
        }
      }
    } catch (err) {
      setError(`Failed to send OTP. Please try again. ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendOTP();
      }}
      className="space-y-4"
    >
      {error && (
        <div className="mb-4 text-red-600 text-sm text-center font-semibold">
          {error}
        </div>
      )}
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
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter phone number with country code"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
          className="h-11 bg-white border-0"
        />
      </div>

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
            className="h-11 pr-10 bg-white border-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
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
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            required
            className="h-11 pr-10 bg-white border-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full sm:w-auto h-12 px-8 mt-2 sm:mt-0 bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 hover:from-electric-600 hover:to-amber-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/30 animate-pulse-glow flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? "Sending OTP..." : "Register"}
      </Button>
    </form>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className=" space-y-2">
        <p className="text-sm text-gray-600">
          We&apos;ve sent a verification code to your phone:
        </p>
      </div>

      <div className="space-y-2">
        <Label>Enter Verification Code</Label>
        <div className="flex ">
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
      {error && (
        <div className="mb-4 text-red-600 text-sm text-center font-semibold">
          {error}
        </div>
      )}

      <Button
        onClick={handleVerifyOTP}
        className="w-full sm:w-auto h-12 px-8 mt-2 sm:mt-0 bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 hover:from-electric-600 hover:to-amber-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/30 animate-pulse-glow flex items-center justify-center"
        disabled={isLoading || formData.otp.length !== 6}
      >
        {isLoading ? "Verifying..." : "Verify Code"}
      </Button>
    </div>
  );

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Create Your Account";
      case 2:
        return "Verify OTP";
      default:
        return "Sign Up";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Enter your details to get started";
      case 2:
        return "We need to verify your identity";
      default:
        return "";
    }
  };

  const handleSignin = () => {
    if (searchParams.get("booking") === "true") {
      router.push("/login?booking=true");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-electric-100 to-lime-100 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <div key={bubble.id} style={getShapeStyle(bubble)} />
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
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={handleSignin}
                  className="text-gradient hover:font-bold font-medium"
                >
                  Sign in
                </span>
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
