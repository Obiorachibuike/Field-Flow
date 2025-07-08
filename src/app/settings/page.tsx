'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MainHeader } from '@/components/main-header';

const FONT_SCALING_KEY = 'font-scaling-enabled';

export default function SettingsPage() {
  const [isFontScalingEnabled, setIsFontScalingEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem(FONT_SCALING_KEY) === 'true';
    setIsFontScalingEnabled(savedPreference);
    setIsMounted(true);
  }, []);

  const handleToggle = (enabled: boolean) => {
    setIsFontScalingEnabled(enabled);
    localStorage.setItem(FONT_SCALING_KEY, String(enabled));
    // Dispatch event so the FontProvider in the same tab can pick up the change
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: FONT_SCALING_KEY,
        newValue: String(enabled),
      })
    );
  };
  
  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <>
      <MainHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground text-lg">Manage your application preferences.</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Appearance</CardTitle>
              <CardDescription>Adjust how the application looks and feels.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <Label htmlFor="font-scaling-toggle" className="flex flex-col space-y-1">
                  <span className="text-base font-medium">Enable Font Scaling</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Increase font sizes across the app for better readability.
                  </span>
                </Label>
                <Switch
                  id="font-scaling-toggle"
                  checked={isFontScalingEnabled}
                  onCheckedChange={handleToggle}
                  aria-label="Toggle font scaling"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
