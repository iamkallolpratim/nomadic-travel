export default function About() {
  return (
    <div className="bg-white">
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About Nomadic Travel
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your trusted Northeast India travel expert — curating authentic,
              sustainable journeys across Assam, Arunachal Pradesh, Nagaland,
              Meghalaya and beyond since 2018.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Our Story
              </h2>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Founded by popular YouTuber Zeemi (Zeemi Walker), whose
                breathtaking videos of Kaziranga elephant safaris, Tawang
                monasteries, living root bridges of Meghalaya, and Naga tribal
                festivals have inspired millions of travellers worldwide.
                <br />
                <br />
                With deep local roots and over a decade of on-ground experience
                across the entire Northeast, we go far beyond the usual tourist
                trails to bring you real, immersive experiences in India's most
                beautiful and culturally rich corner.
                <br />
                <br />
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/@zeemiwalker",
                      "_blank"
                    )
                  }
                >
                  Watch Zeemi's Northeast Journeys →
                </button>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Our Mission
              </h2>
              <p className="mt-6 text-base leading-7 text-gray-600">
                We are passionate about responsible and sustainable tourism in
                Northeast India. Every tour we design supports local communities,
                protects fragile ecosystems — from Kaziranga's rhinos to
                Meghalaya's rainforests — and helps preserve the unique tribal
                cultures and traditions of the region.
              </p>
            </div>
          </div>

          {/* Images remain exactly the same */}
          <div className="mt-16 grid grid-cols-1 gap-8 lg:mt-24 lg:grid-cols-3">
            <img
              src="https://media.assettype.com/outlooktraveller%2F2023-10%2F5b58aa6a-cfcb-45a1-ad9f-5bad3b8984ee%2F106554149_744865456346625_1735154775456169959_n.jpg?w=1024&auto=format%2Ccompress&fit=max"
              alt="Kaziranga National Park - One Horned Rhino"
              className="aspect-[4/3] rounded-2xl object-cover"
            />
            <img
              src="https://images.pexels.com/photos/392100/pexels-photo-392100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Assam Tea Gardens"
              className="aspect-[4/3] rounded-2xl object-cover"
            />
            <img
              src="https://heritageexplorer.in/backend_images/de152e87d81de862f8aab42f3a06874a-663dc7ec6aaeb.jpg"
              alt="Northeast India Tribal Culture"
              className="aspect-[4/3] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
