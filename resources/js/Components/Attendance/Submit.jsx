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

export default function SubmitAttendance() {
    const [transitioning, setTransitioning] = useState(false);

    const { data, setData, post, errors, transform, processing, recentlySuccessful } =
        useForm({
            status: "attend",
            description: "",
            latitude: "",
            longitude: "",
            location: {}
        });

    const submit = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(
            function (position) {
            setData("location", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function (_) {
            alert("cannot get current location");
        });
    };

    useEffect(() => {
        if(data.location.hasOwnProperty("latitude") && data.location.hasOwnProperty("longitude")) {
            transform((data) => ({
                ...data.location,
                status: data.status,
                description: data.description
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
