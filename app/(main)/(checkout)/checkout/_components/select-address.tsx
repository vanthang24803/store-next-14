"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Province = {
  province_id: string;
  province_name: string;
};

type District = {
  district_id: string;
  district_name: string;
};

type Ward = {
  ward_id: string;
  ward_name: string;
};

interface SelectAddressProps {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectAddress = ({ setAddress }: SelectAddressProps) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);

  useEffect(() => {
    axios.get("https://vapi.vnappmob.com/api/province/")
      .then(response => {
        if (response.status === 200) {
          setProvinces(response.data.results);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince}`)
        .then(response => {
          if (response.status === 200) {
            setDistricts(response.data.results);
          }
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
        .then(response => {
          if (response.status === 200) {
            setWards(response.data.results);
          }
        });
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      const provinceName = provinces.find(province => province.province_id === selectedProvince)?.province_name;
      const districtName = districts.find(district => district.district_id === selectedDistrict)?.district_name;
      const wardName = wards.find(ward => ward.ward_id === selectedWard)?.ward_name;
      setAddress(`${provinceName || ''}, ${districtName || ''}, ${wardName || ''}`);
    }
  }, [selectedProvince, selectedDistrict, selectedWard, provinces, districts, wards, setAddress]);
  
  

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select onValueChange={setSelectedProvince}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Tỉnh / thành" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tỉnh thành</SelectLabel>
            {provinces.map((item) => (
              <SelectItem value={item.province_id} key={item.province_id}>
                {item.province_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={setSelectedDistrict}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Quận / huyện" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quận huyện</SelectLabel>
            {districts.map((item) => (
              <SelectItem value={item.district_id} key={item.district_id}>
                {item.district_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={setSelectedWard}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Phường xã" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Phường xã</SelectLabel>
            {wards.map((item) => (
              <SelectItem value={item.ward_id} key={item.ward_id}>
                {item.ward_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
