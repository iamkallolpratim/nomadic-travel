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
              Your trusted partner in exploring the natural wonders and cultural
              heritage of Assam.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Our Story
              </h2>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Founded by the popular YouTuber Zeemi, whose Kaziranga elephant
                safari and tour videos have garnered millions of views
                worldwide, we bring the magic of Assam to life like never
                before. With over a decade of expertise, our intimate knowledge
                of Kaziranga National Park and its surrounding areas allows us
                to craft unforgettable experiences that go beyond the usual
                tourist trails. Check his youtube channel here.
                <br />
                <br />
                <button
                  className="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    window.open("https://www.youtube.com/@zeemi", "_blank")
                  }
                >
                  Youtube
                </button>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Our Mission
              </h2>
              <p className="mt-6 text-base leading-7 text-gray-600">
                We're committed to promoting sustainable tourism while
                preserving Assam's natural beauty and cultural heritage. Through
                our carefully crafted experiences, we aim to create meaningful
                connections between visitors and local communities while
                supporting conservation efforts.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:mt-24 lg:grid-cols-3">
            <img
              src="https://media.assettype.com/outlooktraveller%2F2023-10%2F5b58aa6a-cfcb-45a1-ad9f-5bad3b8984ee%2F106554149_744865456346625_1735154775456169959_n.jpg?w=1024&auto=format%2Ccompress&fit=max"
              alt="Kaziranga National Park"
              className="aspect-[4/3] rounded-2xl object-cover"
            />
            <img
              src="https://images.pexels.com/photos/392100/pexels-photo-392100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Tea Gardens"
              className="aspect-[4/3] rounded-2xl object-cover"
            />
            <img
              src="https://heritageexplorer.in/backend_images/de152e87d81de862f8aab42f3a06874a-663dc7ec6aaeb.jpg"
              alt="Local Culture"
              className="aspect-[4/3] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
