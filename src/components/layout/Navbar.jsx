/*
 * Filename: d:\Main\projects\next-js-dashboard-template\src\components\layout\Navbar.jsx
 * Path: d:\Main\projects\next-js-dashboard-template
 */

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
      
      {/* يوزر بروفايل أو أيقونة الإشعارات */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}