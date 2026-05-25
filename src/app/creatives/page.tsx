"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ImageIcon, Sparkles, TrendingUp, TrendingDown, PlayCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const mockCreatives = [
  {
    id: "1",
    name: "UGC_Test_v2.mp4",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    metrics: {
      hookScore: 92,
      engagementScore: 85,
      thumbStop: 45,
    },
    aiFeedback: "Strong opening hook. Consider testing a different CTA at the end.",
    status: "active"
  },
  {
    id: "2",
    name: "Static_Lifestyle_04.jpg",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    metrics: {
      hookScore: 45,
      engagementScore: 60,
      thumbStop: 22,
    },
    aiFeedback: "Visuals are too dark. Suggest increasing brightness or using high-contrast colors.",
    status: "paused"
  },
  {
    id: "3",
    name: "Product_Demo_Fast.mp4",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    metrics: {
      hookScore: 88,
      engagementScore: 94,
      thumbStop: 38,
    },
    aiFeedback: "Excellent engagement throughout. This format should be replicated.",
    status: "active"
  },
  {
    id: "4",
    name: "Carousel_Benefits.jpg",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    metrics: {
      hookScore: 75,
      engagementScore: 70,
      thumbStop: 31,
    },
    aiFeedback: "Good overall performance, but the text on slide 3 is hard to read.",
    status: "active"
  }
]

export default function CreativesPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-primary" /> Creative Analysis
          </h2>
          <p className="text-muted-foreground">
            AI-driven insights into your ad creatives' performance.
          </p>
        </div>
        <Button>Upload New Creative</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {mockCreatives.map((creative, i) => (
          <motion.div
            key={creative.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-xl h-full flex flex-col group">
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img 
                  src={creative.thumbnail} 
                  alt={creative.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <PlayCircle className="h-6 w-6" />
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-md text-foreground">
                  {creative.type.toUpperCase()}
                </Badge>
                {creative.status === "active" ? (
                  <Badge className="absolute top-2 left-2 bg-emerald-500/80 backdrop-blur-md text-white border-none">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="absolute top-2 left-2 bg-muted/80 backdrop-blur-md border-none">
                    Paused
                  </Badge>
                )}
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base truncate" title={creative.name}>
                  {creative.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="flex flex-col bg-muted/50 p-2 rounded-lg">
                    <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider">Hook</span>
                    <span className={`font-bold mt-1 ${creative.metrics.hookScore > 80 ? 'text-emerald-500' : creative.metrics.hookScore < 50 ? 'text-destructive' : ''}`}>
                      {creative.metrics.hookScore}
                    </span>
                  </div>
                  <div className="flex flex-col bg-muted/50 p-2 rounded-lg">
                    <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider">Engage</span>
                    <span className={`font-bold mt-1 ${creative.metrics.engagementScore > 80 ? 'text-emerald-500' : creative.metrics.engagementScore < 50 ? 'text-destructive' : ''}`}>
                      {creative.metrics.engagementScore}
                    </span>
                  </div>
                  <div className="flex flex-col bg-muted/50 p-2 rounded-lg">
                    <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider">Thumb</span>
                    <span className={`font-bold mt-1 ${creative.metrics.thumbStop > 40 ? 'text-emerald-500' : creative.metrics.thumbStop < 25 ? 'text-destructive' : ''}`}>
                      {creative.metrics.thumbStop}%
                    </span>
                  </div>
                </div>

                <div className="mt-auto bg-primary/10 border border-primary/20 p-3 rounded-xl flex gap-2">
                  <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed text-foreground/80">
                    {creative.aiFeedback}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
