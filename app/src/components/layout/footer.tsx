import Link from "next/link";

export const Footer = () => (
  <footer className="bg-gray-50 border-t pt-12 pb-8">
    <div className="max-w-[1280px] container mx-auto px-4">
      {/* Top section with logo and links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Logo and description section */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-xl font-bold mb-4 font-manrope">Shomotsu</h3>
          <p className="text-sm text-gray-600 mb-4">
            オンライン読書・執筆プラットフォーム
          </p>
        </div>
        <div className="col-span-1">
          <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">サポート</h4>
          <ul className="space-y-3">
            <li>
              <Link 
                href="https://x.com/mitate_gengaku" 
                className="text-sm text-gray-600 hover:text-gray-900"
                >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Bottom section with copyright and legal links */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} <span className="font-manrope">Shomotsu</span>. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/legal/terms" className="text-sm text-gray-500 hover:text-gray-900">利用規約</a>
            <a href="/legal/privacy" className="text-sm text-gray-500 hover:text-gray-900">プライバシーポリシー</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);