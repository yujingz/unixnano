import { Github } from 'lucide-react';

export function TopBar() {
  return (
    <div className="relative">
      <a href="https://github.com/yujingz/unixnano">
        <div className="fixed cursor-pointer hover:text-amber-500 text-white top-0 right-0 mt-4 mr-4">
          <Github className="h-8 w-auto" />
        </div>
      </a>
    </div>
  );
}
