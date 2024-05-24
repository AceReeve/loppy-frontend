import {Avatar,AvatarFallback} from "@/src/components/ui";
import {Button} from "@headlessui/react";

export default function WorkspaceButton(){
    return(
      <>
          <Button className='hover:bg-gray-100/80 bg-[#F2F2F2] border-[#BFBBC2] border-2 h-[80px] w-[400px] px-5 rounded-2xl justify-between gap-2 m-auto flex items-center'>
              <Avatar className='h-[60px] w-[60px]'>
                  <AvatarFallback className="bg-orange-500 text-white text-[42px]">S</AvatarFallback>
              </Avatar>
              <div className='block bg-red text-left font-nunito text-[#43444B]'>
                  <p className = 'text-[16px]'>Test workspace</p>
                  <p className='font-light text-[14px]'>Servi Hero Developers</p>
              </div>
              <div className='flex w-1/3 justify-end'>
                  <div className="flex">
                      {Array.from({length: 3}).map((_item, index) => (
                          <Avatar className='-ml-4 h-[40px] w-[40px] border-2 border-white'>
                              <AvatarFallback className="bg-orange-500 text-white text-[20px]">G</AvatarFallback>
                          </Avatar>
                      ))}
                  </div>
                  <p className = 'font-light text-sm text-[#43444B] content-center '>22+</p>
              </div>
          </Button>

      </>
    );
}