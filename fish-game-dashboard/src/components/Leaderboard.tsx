import { useState } from "react";
import type { Player } from "../type";
import { Trophy, Zap, Coins, ArrowBigUp, Fish, Biohazard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Pagination from "./ui/pagination";
import { formatNumber } from "../utils/formatNumber";

interface LeaderboardProps {
  players: Player[];
}

export function Leaderboard({ players }: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 50;

  const totalPages = Math.ceil(players.length / playersPerPage);

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-center">Rank</th>
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <ArrowBigUp className="h-5 w-5 text-green-500" />
                    <span>Level</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <span>XP</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <span>Gold</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-2">
                    <Fish className="h-5 w-5 text-blue-300" />
                    <span>Status</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <span>Description</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Biohazard className="h-5 w-5 text-red-500" />
                    <span>Infected?</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPlayers.map((player) => (
                <tr
                  key={player.username}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                >
                  <td className="px-4 py-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        player.rank === 1
                          ? "bg-yellow-500/20 text-yellow-500"
                          : player.rank === 2
                          ? "bg-gray-300/20 text-gray-500"
                          : player.rank === 3
                          ? "bg-orange-700/20 text-orange-700"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {player.rank}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{player.username}</td>
                  <td className="px-4 py-3">{player.level}</td>
                  <td className="px-4 py-3">{formatNumber(player.xp)}</td>
                  <td className="px-4 py-3">{formatNumber(player.gold)}</td>
                  <td className="px-4 py-3">
                    {player.fishEmojis ? player.fishEmojis : "N/A"}
                  </td>
                  <td className="px-4 py-3">{player.emojiDescription}</td>
                  <td className="px-4 py-3">
                    {player.isInfected ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirstPlayer={indexOfFirstPlayer}
            indexOfLastPlayer={indexOfLastPlayer}
            playersCount={players.length}
            onPageChange={setCurrentPage}
          />
        )}
      </CardContent>
    </Card>
  );
}
