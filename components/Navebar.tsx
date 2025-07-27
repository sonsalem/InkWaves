"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

const Navebar = () => {
  return (
    <div className="flex items-center z-50 sticky top-0 bg-sec justify-between py-6 border-b-[1px] border-main/20 px-4 sm:px-8 md:px-20 lg:px-40">
      <div className="logo text-lg font-semibold">InkWaves</div>
      <Link href={`/keystatic`}>
        <button className="flex items-center gap-2 bg-main text-sec px-4 py-[6px] rounded-sm shadow-sm hover:bg-main/90 transition-colors duration-200 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add</span>
        </button>
      </Link>
    </div>
  );
};

export default Navebar;
