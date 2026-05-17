export function TopBar() {
  return (
    <div className="border-b border-[#ebebeb] bg-[#f7f7f7] text-[13px] text-[#555] py-2.5 hidden md:block">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-8 flex justify-between items-center gap-6">
        <p className="font-medium text-[#333]">Free shipping on orders above ₹1,300</p>
        <a href="#" className="font-medium text-[#333] hover:text-flat-pink transition-colors">
          Launch Your Brand
        </a>
      </div>
    </div>
  );
}
