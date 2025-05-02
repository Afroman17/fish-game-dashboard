import type { Item } from "../type";
import { Coins, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Badge from "./ui/badge";

interface MarketplaceProps {
  items: Item[];
}

export function Marketplace({ items }: MarketplaceProps) {
  const getItemTypeColor = (type: string) => {
    switch (type) {
      case "fishing_rod":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30 hover:bg-blue-500/30";
      case "poison_leveling":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30 hover:bg-purple-500/30";
      case "poison_delay":
        return "bg-red-500/20 text-red-500 border-red-500/30 hover:bg-red-500/30";
      case "poison_recovery":
        return "bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30";
      case "poison_reveal_fishes":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30 hover:bg-gray-500/30";
    }
  };

  const formatItemType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <span>Market</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="h-full flex flex-col justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <div className="flex flex-col justify-between gap-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <Badge
                    className={getItemTypeColor(item.type)}
                    label={formatItemType(item.type)}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {item.description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold">
                  {item.cost.toLocaleString()} Gold
                  <Coins className="h-4 w-4 text-yellow-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
