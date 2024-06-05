import { GithubIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="h-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Conectando&nbsp;</h1>
        <h1 className={title()}>con las Obras Maestras del&nbsp;</h1>
        <br />
        <h1 className={title({ color: "violet" })}>Rijksmuseum&nbsp;</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Descubre y guarda tus obras de arte favoritas.
        </h2>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <a className="flex flex-row gap-1" href="https://github.com/Neider28" target="_blank">
            <GithubIcon />
            GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}
