import Link from 'next/link';

function Home() {
  return (
    <ul className="flex gap-4">
      <li className="mr-4">
        <Link href="/">
          <span className="text-white hover:underline cursor-pointer">Home</span>
        </Link>
      </li>
      <li className="mr-4">
        <Link href="/scrape">
          <span className="text-white hover:underline cursor-pointer">Scrape</span>
        </Link>
      </li>
      <li className="mr-4">
        <Link href="/blog/hello-world">
          <span className="text-white hover:underline cursor-pointer">Blog Post</span>
        </Link>
      </li>
    </ul>
  );
}

export default Home;