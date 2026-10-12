"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import {
  switchDark,
  switchLight,
  switchSystem,
} from "@/redux/theme/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => dispatch(switchLight())}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(switchDark())}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(switchSystem())}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
