import { useEffect, useState } from "react";
import ai from "../assets/image.jpeg";
import { Form, Select } from "antd";
import { getSession, saveSession } from "../shared/Session";

const Navbar = () => {
  const [star, setStar] = useState<string>("llama_article");
  const { Item } = Form;

  useEffect(() => {
    const savedStar = getSession();
    if (savedStar) {
      setStar(savedStar);
    }
  }, []);

  useEffect(() => {
    if (star) {
      saveSession(star);
    }
  }, [star]);

  const handleStarChange = (value: string) => {
    setStar(value);
  };

  return (
    <div className="bg-mainColor rounded-bl-xl rounded-br-xl  shadow-md">
      <nav className="container mx-auto z-20 w-full">
        <div className=" max-w-screen-xl items-center justify-between p-4">
          <div className="grid grid-cols-12">
            <div className="col-span-6  md:col-span-6 lg:col-span-6">
              <div className="flex items-center gap-2">
                <div className="relative flex">
                  <img
                    src={ai}
                    className="h-10 w-10 items-center justify-center rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-white">
                  <h1 className="font-semibold">Article Extractor</h1>
                </div>
              </div>
            </div>
            <div className="col-span-6 flex justify-end items-center  md:col-span-6 lg:col-span-6">
              <Item name="model" className="w-full md:w-auto px-2">
                <Select
                  size="large"
                  placeholder="select Model"
                  // defaultValue={star}
                  onChange={handleStarChange}
                  value={star}
                  options={[
                    { value: "llama_article", label: "Article" },
                    { value: "llama_socmed", label: "Socmed" },
                  ]}
                />
              </Item>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
