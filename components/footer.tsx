"use client";

import Link from "next/link";
import { info, footer } from "@/constant";
import { Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Footer = () => {
  return (
    <>
      <div className="max-w-screen-xl lg:block hidden mx-auto  py-8 border-t-[1px]">
        <div className="flex justify-between pb-6">
          <div className="flex flex-col space-y-3">
            <p className="text-xl font-semibold text-[#417505]">{info.title}</p>
            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-2 font-medium">{info.address}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="w-4 h-4" />
              <span className="line-clamp-2 font-medium">{info.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4" />
              <span className="line-clamp-2 font-medium">{info.email}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {footer.map((item, index) => (
              <div className="flex flex-col space-y-3" key={index}>
                <p className="text-xl font-semibold text-[#417505]">
                  {item.title}
                </p>
                <ol className="flex flex-col space-y-2 text-sm">
                  {item.data.map((label, i) => (
                    <Link
                      href={label.url}
                      key={i}
                      className="hover:text-[#65b10d] font-medium"
                    >
                      {label.name}
                    </Link>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <span className="mt-4 flex items-center justify-center text-sm text-neutral-600">
          Copyright © 2024 AMAK Store. Powered by
          <Link
            href={`https://github.com/vanthang24803`}
            className="mx-1 hover:text-[#65b10d] font-medium"
            target="_blank"
          >
            May Nguyen
          </Link>
        </span>
      </div>

      <div className="lg:hidden flex flex-col ">
        <Accordion type="single" collapsible className="w-full px-4 md:px-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:text-[#417505]">
              {info.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-2 font-medium">
                    {info.address}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4" />
                  <span className="line-clamp-2 font-medium">{info.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4" />
                  <span className="line-clamp-2 font-medium">{info.email}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {footer.map((value, num) => (
            <AccordionItem value={num.toString()} key={num}>
              <AccordionTrigger className="hover:text-[#417505]">
                {value.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  {value.data.map((a, b) => (
                    <Link
                      href={a.url}
                      className="line-clamp-2 font-medium text-sm hover:text-[#65b10d]"
                      key={b}
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Separator />

        <span className="my-4 flex items-center justify-center text-sm text-neutral-600">
          Copyright © 2024 AMAK Store. Powered by
          <Link
            href={`https://github.com/vanthang24803`}
            className="mx-1 hover:text-[#65b10d] font-medium"
            target="_blank"
          >
            May Nguyen
          </Link>
        </span>
      </div>
    </>
  );
};
