import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-background">
      <Container>
        <div className="py-6 text-center">
          <p className="text-sm">© {new Date().getFullYear()} memaelade.lifestyle</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
