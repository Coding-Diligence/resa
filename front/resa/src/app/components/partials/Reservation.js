export default function Reservation() {
    return (
        <form className="w-3/4 p-6 relative top-down bg-sky-950/70 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Réserver un espace</h2>
            <div className="mb-4 flex flex-row ">
                <div className="flex flex-col w-full">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Destination</label>
                    <input type="text" id="name" name="name" required className="mt-1 block p-2 border border-gray-300 bg-white text-sky-950 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Où souhaitez-vous partir ?" />
                </div>
            </div>
            <div className="mb-4 flex flex-row justify-between">
                    <div className="flex flex-col w-1/4 ml-4 mb-8">
                        <div className="flex flex-col w-3/4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mt-4">Quand souhaitez-vous voyager ?</label>
                            <div className="flex flex-row space-x-4">
                                <input type="date" id="date" name="date" required className="mt-1 block bg-white w-2/4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sky-950" />
                                <input type="date" id="date" name="date" required className="mt-1 block bg-white w-2/4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sky-950" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-1/4 ml-4 mb-8">
                        <div className="flex flex-col w-3/4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mt-4">Quand souhaitez-vous voyager ?</label>
                            <div className="flex flex-row space-x-4">
                                <div className="flex flex-col w-3/4">
                                    <input type="text" id="text" name="text" required className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="🖍️ Quel véhicule "/>
                                </div>

                                <div className="flex flex-col w-3/4">
                                    <input type="text" id="text" name="text" required className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="🖍️ 2 adultes "/>
                                </div>

                                <div className="flex flex-col w-3/4">
                                    <input type="text" id="text" name="text" required className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="➕ animaux"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </form>
    );
}