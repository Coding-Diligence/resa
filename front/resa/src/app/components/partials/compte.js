"use client";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import Link from "next/link";

export default function Compte() {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button variant="bordered" className="cursor-pointer">Mon compte</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="faded" className="w-48 bg-sky-950 p-4 rounded-2xl shadow-xl/30">
        <DropdownItem key="profile"><Link href="/profile">Modifier le profile</Link></DropdownItem>
        <DropdownItem key="about"><Link href="/about">A propos</Link></DropdownItem>
        <DropdownItem key="logout" className="text-danger hover:text-red-200 hover:transition border-t-2 cursor-pointer border-sky-800 mt-1" color="danger">
            ⏮️ Déconnexion
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
