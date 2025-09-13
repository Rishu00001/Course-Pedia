import React from "react";
import { MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { RiRefund2Fill } from "react-icons/ri";
import { MdOutlineHd } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
const Logos = () => {
  return (
    <div
      className="w-[100vw] min-h-[90px] flex items-center justify-center
    flex-wrap gap-4 md:mb-[50px]"
    >
      <div
        className="flex items-center justify-center
      gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer"
      >
        <MdOutlineCastForEducation
          className="w-[35px] h-[35px] fill-[#03394b]
        text-[#03394b]"
        />
        20k+ Courses
      </div>
      <div
        className="flex items-center justify-center
      gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer"
      >
        <SiOpenaccess
          className="w-[35px] h-[35px] fill-[#03394b]
        text-[#03394b]"
        />
        Lifetime Access
      </div>
      <div
        className="flex items-center justify-center
      gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer"
      >
        <RiRefund2Fill
          className="w-[35px] h-[35px] fill-[#03394b]
        text-[#03394b]"
        />
        Instant Refund
      </div>
      <div
        className="flex items-center justify-center
      gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer"
      >
        <MdOutlineHd
          className="w-[35px] h-[35px] fill-[#03394b]
        text-[#03394b]"
        />
        HD Videos
      </div>
      <div
        className="flex items-center justify-center
      gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer"
      >
        <FaPeopleGroup
          className="w-[35px] h-[35px] fill-[#03394b]
        text-[#03394b]"
        />
        Large Community
      </div>
    </div>
  );
};

export default Logos;
