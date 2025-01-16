import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { data } from "@/utils/dashboard/sectionNameLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiMenu3Line } from "react-icons/ri";

function RightSection() {
  return (
    <div className="py-3 h-full md:h-[90%]">
      <Tabs defaultValue="my-profile" className="w-full h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-3 font-kanit ">Account Settings</h1>
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <RiMenu3Line className="text-3xl" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="md:hidden">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <TabsList className="flex flex-col h-full w-full md:w-full lg:w-3/4 bg-transparent justify-start items-start text-left font-kanit">
                  {data?.map((el: any) => (
                    <TabsTrigger
                      value={el.link}
                      key={el.id}
                      className="w-fit my-[2px] py-3 px-3 rounded-3xl data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow"
                    >
                      <DropdownMenuItem>
                        <h1 className="text-left w-fit md:text-sm lg:text-md tracking-wide flex gap-2 items-center">
                          {el.icon} {el.name}
                        </h1>
                      </DropdownMenuItem>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="h-full md:h-[95%] w-full bg-white rounded-2xl p-3 md:p-2 lg:p-3 flex">
          <div className="hidden sm:inline-block w-[30%] md:w-[35%] lg:w-[25%] border-r-2 border-slate-100">
            <TabsList className="flex flex-col h-full w-full md:w-full lg:w-3/4 bg-transparent justify-start items-start text-left font-kanit">
              {data?.map((el: any) => (
                <TabsTrigger
                  value={el.link}
                  key={el.id}
                  className="w-fit my-[2px] py-3 px-3 rounded-3xl data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow"
                >
                  <h1 className="text-left w-fit md:text-sm lg:text-md tracking-wide flex gap-2 items-center">
                    {el.icon} {el.name}
                  </h1>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="w-full md:w-[70%] lg:w-[80%] px-5">
            {data?.map((el: any) => (
              <TabsContent value={el.link} key={el.id}>
                <div>{el.content}</div>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default RightSection;
