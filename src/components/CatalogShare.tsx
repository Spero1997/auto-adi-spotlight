
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Check, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { generateShareableUrl } from "@/utils/vehicleImportService";

const CatalogShare = () => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [shareableUrl, setShareableUrl] = useState("");

  const handleOpenShare = () => {
    setShareableUrl(generateShareableUrl());
    setOpen(true);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      toast.success("Lien copié dans le presse-papier");
    } catch (err) {
      toast.error("Impossible de copier le lien");
      console.error("Erreur lors de la copie:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={handleOpenShare}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Partager le catalogue
      </Button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager votre catalogue</DialogTitle>
          <DialogDescription>
            Partagez ce lien pour que d'autres personnes puissent voir votre catalogue de véhicules sur leurs appareils.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <div className="flex items-center border rounded-md px-3 py-2 bg-muted/50">
              <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                readOnly
                value={shareableUrl}
              />
            </div>
          </div>
          <Button 
            type="button" 
            size="icon" 
            onClick={copyToClipboard}
            variant={copied ? "default" : "outline"}
            className="transition-all"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start mt-4">
          <Button
            type="button"
            variant="default"
            onClick={() => setOpen(false)}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CatalogShare;
