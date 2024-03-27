import "./App.css";
import CollectionPage from "./components/CollectionPage";

function App() {
  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <h1 className="text-4xl font-bold mb-4">
        Find out your waste collection day
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <CollectionPage />
        </div>
        <div className="md:border-l md:border-gray-300 md:pl-4">
          <div className="border border-gray-300 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4">Related content</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Add to your calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  View and download printable schedule
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="flex justify-between items-center space-x-5 mt-8 text-sm">
        <div className="flex justify-between items-center space-x-4">
          <a href="#" className="text-blue-600 hover:underline">
            Help
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Contact
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Accessibility Statement
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
