import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useRef } from "react";
import SelectBox from "@/Components/SelectBox";
import { useState, useEffect } from "react";

export default function Submit() {

    const [transitioning, setTransitioning] = useState(false);

    const { data, setData, post, errors, transform, processing, recentlySuccessful } =
        useForm({
            status: "attend",
            description: "",
            latitude: "",
            longitude: "",
            location: {},
            address: ""
        });

    const submit =  (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setData("location", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                if(data.location.hasOwnProperty("latitude") && data.location.hasOwnProperty("longitude")) {
                getLocation(`https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=nZNJsKY6wAwZfcPH2TD4tHPCJzxpq4pUUZpRICg1INY&at=${data.location.latitude},${data.location.longitude}&lang=id`);
            }
        }, function (_) {
            alert("cannot get current location");
        });
    };

  async function getLocation (url) {
        fetch(url).then(async(data) => {
            const result = await data.json();
            setData("address", result.items[0].address.label);
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        if(data.address !== '') {
            transform((data) => ({
                ...data.location,
                status: data.status,
                description: data.description,
                address: data.address
            }))
            post(route("attendance.submit"), {
                preserveScroll: true,
                onSuccess: () => {
                    alert("Attendance is success");
                },
                onError: (errors) => {
                    alert("Attendance is not success");
                },
            });
            }
    }, [data.location]);

    useEffect(() => {
        if (data.status === "attend") {
            setTransitioning(false);
        } else {
            setTransitioning(true);
        }
    }, [data.status]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6 ">
            <div>
                <InputLabel
                    htmlFor="info"
                    value="Silahkan lakukan absensi"
                    className="my-2"
                />

                <SelectBox
                    onChange={(e) => setData("status", e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-full"
                    options={[
                        { value: "attend", label: "Hadir" },
                        { value: "leave", label: "Cuti" },
                        { value: "sick", label: "Sakit" },
                        { value: "permit", label: "Izin" },
                        { value: "business_trip", label: "Perjalanan Dinas" },
                        {
                            value: "remote",
                            label: "Kerja Remote (Diluar kantor)",
                        },
                    ]}
                />
                <InputError className="mt-2" message={errors.name} />
            </div>

            <Transition
                show={transitioning}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div>
                    <InputLabel
                        htmlFor="description"
                        value="Masukkan deskripsi berdasarkan pernyataan :"
                        className="my-2"
                    />

                    <TextInput
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
            </Transition>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Absensi</PrimaryButton>
            </div>
        </form>
    );
}
