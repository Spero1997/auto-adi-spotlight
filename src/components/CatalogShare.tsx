import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Check, Link as LinkIcon, Download, QrCode } from "lucide-react";
import { toast } from "sonner";
import { generateShareableUrl, getCatalogIdFromUrl } from "@/utils/vehicleImportService";
import { QRCodeSVG } from "qrcode.react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CatalogShare = () => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [shareableUrl, setShareableUrl] = useState("");
  const [isSharedCatalog, setIsSharedCatalog] = useState(false);

  useEffect(() => {
    const catalogId = getCatalogIdFromUrl();
    setIsSharedCatalog(!!catalogId);
  }, []);

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

  const downloadQRCode = () => {
    const svg = document.getElementById("share-qrcode");
    if (svg) {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        const img = new Image();
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const link = document.createElement('a');
              link.download = 'catalogue-vehicules-qr.png';
              link.href = URL.createObjectURL(blob);
              link.click();
              toast.success("QR code téléchargé");
            }
          });
        };
        
        img.src = url;
      }
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
        {isSharedCatalog ? "Partager ce catalogue" : "Partager le catalogue"}
      </Button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager votre catalogue</DialogTitle>
          <DialogDescription>
            Partagez ce lien ou scannez le QR code pour que d'autres personnes puissent voir votre catalogue de véhicules sur leurs appareils.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="qrcode" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link" className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              Lien
            </TabsTrigger>
            <TabsTrigger value="qrcode" className="flex items-center gap-1">
              <QrCode className="h-4 w-4" />
              QR Code
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
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
            
            <div className="mt-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
              <p className="font-semibold">Important :</p>
              <p>Assurez-vous de copier et d'envoyer ce lien à vos collaborateurs par email ou message pour qu'ils puissent accéder au même catalogue de véhicules.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="qrcode" className="mt-4">
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-white">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCodeSVG 
                  id="share-qrcode"
                  value={shareableUrl} 
                  size={220}
                  includeMargin={true}
                  level="H"
                  className="border-4 border-white"
                />
              </div>
              <p className="text-sm text-center mt-4 text-gray-500">
                Scannez ce QR code avec votre téléphone pour accéder au catalogue
              </p>
              <Button 
                onClick={downloadQRCode} 
                variant="default" 
                className="mt-4"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger le QR code
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start mt-4">
          <Button
            type="button"
            variant="secondary"
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
