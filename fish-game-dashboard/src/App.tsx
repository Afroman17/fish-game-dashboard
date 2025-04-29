"use client";

import { useEffect, useState } from "react";
import { Leaderboard } from "./components/Leaderboard";
import { Marketplace } from "./components/Marketplace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import type { Player, Item } from "./type";
import { fetchWithCache } from "./utils/cache";
import marlin from "../public/marlin.svg";
import { LoaderCircle } from "lucide-react";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const leaderboardData = await fetchWithCache<{ players: Player[] }>(
          "https://api-game.bloque.app/game/leaderboard"
        );
        setPlayers(leaderboardData.players);

        const marketplaceData = await fetchWithCache<{ items: Item[] }>(
          "https://api-game.bloque.app/game/market"
        );
        setItems(marketplaceData.items);

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "No se pudieron cargar los datos. Usando datos en caché si están disponibles."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex w-full">
            <h1 className="text-2xl font-bold">
              Galactic <p className="text-purple-300">Fishing Game</p>
            </h1>
            <div className="flex items-center gap-2 pl-3">
              <img
                src={marlin}
                className="logo"
                alt="Marlin logo"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </div>

          {!online && (
            <div className="mt-2 text-sm text-amber-600 dark:text-amber-400">
              Offline - Showing cached data
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center min-h-[calc(100vh-150px)] w-full">
            <LoaderCircle className="animate-spin rounded-full h-15 w-15" />
          </div>
        ) : error && (!players.length || !items.length) ? (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <Tabs defaultValue="leaderboard" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger
                value="leaderboard"
                className="hover:cursor-pointer transition-all duration-300"
              >
                Leaderboard
              </TabsTrigger>
              <TabsTrigger
                value="marketplace"
                className="hover:cursor-pointer transition-all duration-300"
              >
                Marketplace
              </TabsTrigger>
            </TabsList>
            <TabsContent value="leaderboard">
              <Leaderboard players={players} />
            </TabsContent>
            <TabsContent value="marketplace">
              <Marketplace items={items} />
            </TabsContent>
          </Tabs>
        )}
      </main>

      <footer className="mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Galactic Fishing Game
        </div>
      </footer>
    </div>
  );
}

export default App;
