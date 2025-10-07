"use client";

import Image from "next/image";

const teamMembers = [
  {
    imageUrl: "/assets/images/home/team/team1.webp",
    name: "Jason Campbell",
    position: "Chief Executive Officer (CEO)",
  },
  {
    imageUrl: "/assets/images/home/team/team2.webp",
    name: "Chloe Wilson",
    position: "Chief Financial Officer (CFO)",
  },
  {
    imageUrl: "/assets/images/home/team/team3.webp",
    name: "Liam Adams",
    position: "Chief Technology Officer (CTO)",
  },
];

const Teams = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col px-3 sm:px-8 body-container">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold uppercase text-foreground sm:text-xl">
          Team
        </h1>
        <h1 className="text-2xl sm:text-3xl text-primary">Check Our Team</h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:justify-between sm:gap-6 mt-4">
        {teamMembers.map((teamMember, index) => {
          return (
            <div className="relative mx-2 sm:mx-0" key={index}>
              <div className="relative">
                <Image
                  src={teamMember.imageUrl}
                  width={500}
                  height={500}
                  alt={`${teamMember.name} - ${teamMember.position}`}
                  className="rounded-sm object-cover transform transition duration-300 ease-in-out hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end items-center">
                  <div className="bg-white bg-opacity-50 p-2">
                    <p className="text-black text-xl text-center font-semibold">
                      {teamMember.name}
                    </p>
                    <p className="text-gray-600 text-center mt-1 italic">
                      {teamMember.position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Teams;
