"use client";

import type React from "react";

import { useState } from "react";
import type { Player } from "../type";
import { Zap, Coins, ArrowBigUp, Fish, Biohazard, Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import Pagination from "./ui/pagination";
import { formatNumber } from "../utils/formatNumber";

interface LeaderboardProps {
  players: Player[];
}

export function Leaderboard({ players }: LeaderboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 50;

  // Filter players based on search term
  const filteredPlayers = players.filter((player) =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  // Reset to first page when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardHeader typeLeaderboard />
        <div className="relative w-full sm:w-64 sm:pt-4 md:w-80 md:pr-4 pb-4 px-4">
          <Input
            placeholder="Search by username..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
      </div>
      <CardContent className="min-h-[50vh]">
        {filteredPlayers.length > 0 ? (
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
                            ? "bg-gray-300/20 text-gray-300"
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
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted/50 p-4 rounded-full mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No players found</h3>
            <p className="text-muted-foreground">
              Try searching with a different username
            </p>
          </div>
        )}

        {filteredPlayers.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirstPlayer={indexOfFirstPlayer}
            indexOfLastPlayer={Math.min(
              indexOfLastPlayer,
              filteredPlayers.length
            )}
            playersCount={filteredPlayers.length}
            onPageChange={setCurrentPage}
          />
        )}
      </CardContent>
    </Card>
  );
}
