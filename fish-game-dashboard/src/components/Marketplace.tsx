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
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "poison_leveling":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "poison_delay":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "poison_recovery":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "poison_reveal_fishes":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
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
