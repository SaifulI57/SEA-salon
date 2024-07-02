<script>
    import { goto } from "$app/navigation";

    const handleClickAuth = () => {
        goto('/auth')
    }
</script>

<div id="service" class="-top-10 relative"></div>
<div class="container border-t-2 overflow-auto border-black h-screen p-8">
    <div class="items-center text-center h-full">
        <div class="services h-full">
            <h1 class="font-syne text-6xl font-bold py-8">Our Services</h1>


            <div class="service-item grid grid-cols-2 h-full">
                <div class="basis-1/2 w-full h-full py-4">
                    <div class=" relative background-hair inset-x-44 inset-y-32 w-1/2 h-1/2 rounded-xl">
                        <div class="content-hair rounded-xl h-full w-full"></div>
                    </div>
                    
                </div>
                <div class="basis1/2 grid grid-cols-5 justify-items-center w-full">
                    <div class="relative inset-y-32 content-hair-desc col-start-2 col-span-3">
                        <div class="service-title text-4xl font-semibold font-syne">
                    Haircuts and Styling
                </div>
                <div class="relative inset-y-24 inset-x-10 service-description font-syne text-justify self-center w-3/4">
                    Experience the latest trends in haircuts and styling. Our expert stylists will help you achieve the perfect look for any occasion.
                </div>
                <div class="button relative inset-y-44 inset-x-10 p-2 border-2 w-24 rounded-full border-black border-r-4 border-b-4 hover:bg-slate-300 hover:duration-200 active:border-b-2 active:border-r-2 active:ease-in-out"><button on:click={handleClickAuth}>Book Now</button></div>
                    </div>
                

                </div>
            </div>
            <div class="service-item grid grid-cols-2 h-full">
                <div class="basis-1/2 w-full h-full py-4">
                    <div class=" relative background-manicure inset-x-44 inset-y-32 w-1/2 h-1/2 rounded-xl">
                        <div class="content-manicure rounded-xl h-full w-full"></div>
                    </div>
                    
                </div>
                <div class="basis1/2 grid grid-cols-5 justify-items-center w-full">
                    <div class="relative inset-y-32 content-hair-desc col-start-2 col-span-3">
                        <div class="service-title relative inset-x-9 text-4xl font-semibold font-syne">
                    Manicure and Pedicure
                </div>
                <div class="relative inset-y-24 inset-x-10 service-description font-syne text-justify self-center w-3/4">
                    Pamper yourself with our luxurious manicure and pedicure services. From classic treatments to modern nail art, we have something for everyone.
                </div>
                <div class="button relative inset-y-44 inset-x-10 p-2 border-2 w-24 rounded-full border-black border-r-4 border-b-4 hover:bg-slate-300 hover:duration-200 active:border-b-2 active:border-r-2 active:ease-in-out"><button on:click={handleClickAuth}>Book Now</button></div>
                    </div>
                

                </div>
            </div>
            <div class="service-item grid grid-cols-2 h-full">
                <div class="basis-1/2 w-full h-full py-4">
                    <div class=" relative background-facial inset-x-44 inset-y-32 w-1/2 h-1/2 rounded-xl">
                        <div class="content-facial rounded-xl h-full w-full"></div>
                    </div>
                    
                </div>
                <div class="basis1/2 grid grid-cols-5 justify-items-center w-full">
                    <div class="relative inset-y-32 content-hair-desc col-start-2 col-span-3">
                        <div class="relative -inset-x-3 service-title text-4xl font-semibold font-syne">
                    Facial Treatments
                </div>
                <div class="relative inset-y-24 inset-x-10 service-description font-syne text-justify self-center w-3/4">
                    Rejuvenate your skin with our specialized facial treatments. Our experienced estheticians use top-quality products to ensure your skin looks its best.
                </div>
                <div class="button relative inset-y-44 inset-x-10 p-2 border-2 w-24 rounded-full border-black border-r-4 border-b-4 hover:bg-slate-300 hover:duration-200 active:border-b-2 active:border-r-2 active:ease-in-out"><button on:click={handleClickAuth}>Book Now</button></div>
                    </div>
                

                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .container::-webkit-scrollbar {
        display: none;
    }
    .background-hair {
        background-color: #FF68B5;
    }
    .background-manicure {
        background-color: #FF7A5C;
    }
    .background-facial {
        background-color: #56CDE7;
    }
    .content-facial {
        background-image: url('../../lib/images/facial.jpg');
        background-size: cover;
        transform: translateX(1rem) translateY(-1rem);
    }
    .content-manicure {
        background-image: url('../../lib/images/manicure.jpg');
        background-size: cover;
        transform: translateX(1rem) translateY(-1rem);
    }
    .content-hair {
        background-image: url('../../lib/images/haircut.jpg');
        background-size: cover;
        transform: translateX(1rem) translateY(-1rem);
    }
</style>