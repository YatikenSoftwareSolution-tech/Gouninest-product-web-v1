import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

// Type definitions for better type safety
type TabsRootProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

// Memoized Tabs root component
const Tabs = React.memo(TabsPrimitive.Root)
Tabs.displayName = "Tabs"

// Optimized TabsList with memoization and better accessibility
const TabsList = React.memo(
  React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
    ({ className, children, ...props }, ref) => (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    )
  )
)
TabsList.displayName = "TabsList"

// Optimized TabsTrigger with enhanced accessibility and performance
const TabsTrigger = React.memo(
  React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
    ({ className, children, disabled, ...props }, ref) => (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </TabsPrimitive.Trigger>
    )
  )
)
TabsTrigger.displayName = "TabsTrigger"

// Optimized TabsContent with lazy loading support and better performance
const TabsContent = React.memo(
  React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
    ({ className, children, ...props }, ref) => (
      <TabsPrimitive.Content
        ref={ref}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Content>
    )
  )
)
TabsContent.displayName = "TabsContent"

// Export all components
export { Tabs, TabsList, TabsTrigger, TabsContent }

// Export types for external use
export type { TabsRootProps, TabsListProps, TabsTriggerProps, TabsContentProps }
