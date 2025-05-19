
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cookie } from "lucide-react";
import { toast } from "sonner";

type CookieType = {
  id: string;
  title: string;
  description: string;
  required: boolean;
  enabled: boolean;
};

const defaultCookies: CookieType[] = [
  {
    id: "necessary",
    title: "Necessary Cookies",
    description: "These cookies are essential for the website to function properly.",
    required: true,
    enabled: true,
  },
  {
    id: "preferences",
    title: "Preferences Cookies",
    description: "These cookies allow the website to remember choices you make and provide enhanced, more personal features.",
    required: false,
    enabled: true,
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    required: false,
    enabled: false,
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description: "These cookies are used to track visitors across websites to enable us to display relevant ads.",
    required: false,
    enabled: false,
  },
];

interface CookieSettingsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CookieSettings = ({ isOpen, onOpenChange }: CookieSettingsProps) => {
  const [cookies, setCookies] = useState<CookieType[]>(defaultCookies);

  const handleToggleCookie = (cookieId: string) => {
    setCookies((prev) =>
      prev.map((cookie) =>
        cookie.id === cookieId && !cookie.required
          ? { ...cookie, enabled: !cookie.enabled }
          : cookie
      )
    );
  };

  const handleSave = () => {
    // In a real app, this would save cookies preferences to localStorage or send to server
    localStorage.setItem("cookiePreferences", JSON.stringify(cookies));
    toast.success("Cookie preferences saved successfully");
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-xl">
            <Cookie className="h-5 w-5 text-gene-primary" />
            Cookie Settings
          </AlertDialogTitle>
          <AlertDialogDescription>
            Manage your cookie preferences. Required cookies are necessary for the website to function
            and cannot be disabled.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-6 space-y-6">
          {cookies.map((cookie) => (
            <div key={cookie.id} className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={cookie.id} className="text-base font-medium">
                  {cookie.title}
                </Label>
                <Switch
                  id={cookie.id}
                  checked={cookie.enabled}
                  onCheckedChange={() => handleToggleCookie(cookie.id)}
                  disabled={cookie.required}
                  className={cookie.required ? "cursor-not-allowed opacity-80" : ""}
                />
              </div>
              <p className="text-sm text-muted-foreground">{cookie.description}</p>
              {cookie.required && (
                <span className="inline-flex rounded-full bg-gene-primary/10 px-2 py-1 text-xs font-medium text-gene-primary">
                  Required
                </span>
              )}
            </div>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} className="bg-gene-primary hover:bg-gene-primary/90">
            Save Preferences
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CookieSettings;
