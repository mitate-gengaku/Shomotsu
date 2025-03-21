import Link from "next/link";

export const Footer = () => (
  <footer className="bg-gray-50 border-t pt-12 pb-8" data-testid="footer">
    <div className="w-full max-w-[1280px] container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-1">
          <h3
            className="text-lg lg:text-xl font-bold mb-4 font-manrope"
          >
            Shomotsu
          </h3>
          <p
            className="text-xs lg:text-sm text-gray-600 mb-4"
          >
            オンライン読書・執筆プラットフォーム
          </p>
        </div>
        <div className="col-span-1">
          <h4
            className="text-xs lg:text-sm font-semibold text-gray-900 uppercase mb-4"
          >
            サポート
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="https://x.com/mitate_gengaku"
                className="text-xs lg:text-sm text-gray-600 hover:text-gray-900"
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p
            className="text-sm text-gray-500 mb-4 md:mb-0"
            data-testid="footer-copywright"
          >
            <small>
              © {new Date().getFullYear()}{" "}
              <span className="font-manrope">Shomotsu</span>. All rights
              reserved.
            </small>
          </p>
          <div className="flex space-x-6">
            <Link
              href="/legal/terms"
              className="text-xs lg:text-sm text-gray-500 hover:text-gray-900"
            >
              利用規約
            </Link>
            <Link
              href="/legal/privacy"
              className="text-xs lg:text-sm text-gray-500 hover:text-gray-900"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
