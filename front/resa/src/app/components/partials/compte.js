"use client";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import Link from "next/link";

export default function Compte() {
  return (
    <Dropdown>
      <DropdownTrigger>
      <Button variant="bordered" className="cursor-pointer px-0">
  <div className="border-2 border-[#e76f51] px-4 py-2 rounded-full bg-white flex items-center relative">
    <p className="text-2xl text-sky-950 font-black">Y</p>
    <span className="absolute -bottom-2 -right-4 bg-blue-500 text-white text-[10px] font-bold px-2  rounded shadow-md">Admin</span>
  </div>
</Button>

      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="faded" className="w-50 bg-sky-950 py-4 px-2 rounded-2xl shadow-xl/30">
        <DropdownItem key="profile" className="py-2">
          <Link href="/profile"className="flex justify-center items-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z" fill="#ffffff"></path> </g>
            </svg>Modifier le profile
            </Link>
          </DropdownItem>
        <DropdownItem key="about" className="py-2">
          <Link href="/about" className="flex justify-center items-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path clip-rule="evenodd" d="m12 3.75c-4.55635 0-8.25 3.69365-8.25 8.25 0 4.5563 3.69365 8.25 8.25 8.25 4.5563 0 8.25-3.6937 8.25-8.25 0-4.55635-3.6937-8.25-8.25-8.25zm-9.75 8.25c0-5.38478 4.36522-9.75 9.75-9.75 5.3848 0 9.75 4.36522 9.75 9.75 0 5.3848-4.3652 9.75-9.75 9.75-5.38478 0-9.75-4.3652-9.75-9.75zm9.75-.75c.4142 0 .75.3358.75.75v3.5c0 .4142-.3358.75-.75.75s-.75-.3358-.75-.75v-3.5c0-.4142.3358-.75.75-.75zm0-3.25c-.5523 0-1 .44772-1 1s.4477 1 1 1h.01c.5523 0 1-.44772 1-1s-.4477-1-1-1z" fill="#ffffff" fill-rule="evenodd"></path></g></svg>
            A propos
          </Link>
          </DropdownItem>
        <DropdownItem key="logout" className="pt-2 text-danger hover:text-red-200 hover:transition border-t-2 cursor-pointer border-sky-800 mt-1" color="danger">
        <Link href="/logout" className="flex justify-center items-center gap-3">
        <svg className="w-5 h-5 ml-1" fill="#ff2600" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>logout</title> <path d="M0 9.875v12.219c0 1.125 0.469 2.125 1.219 2.906 0.75 0.75 1.719 1.156 2.844 1.156h6.125v-2.531h-6.125c-0.844 0-1.5-0.688-1.5-1.531v-12.219c0-0.844 0.656-1.5 1.5-1.5h6.125v-2.563h-6.125c-1.125 0-2.094 0.438-2.844 1.188-0.75 0.781-1.219 1.75-1.219 2.875zM6.719 13.563v4.875c0 0.563 0.5 1.031 1.063 1.031h5.656v3.844c0 0.344 0.188 0.625 0.5 0.781 0.125 0.031 0.25 0.031 0.313 0.031 0.219 0 0.406-0.063 0.563-0.219l7.344-7.344c0.344-0.281 0.313-0.844 0-1.156l-7.344-7.313c-0.438-0.469-1.375-0.188-1.375 0.563v3.875h-5.656c-0.563 0-1.063 0.469-1.063 1.031z"></path> </g></svg>
        <p className="-ml-1">Déconnexion</p>
        </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
