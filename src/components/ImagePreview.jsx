import Loading from "./Loading";

const ImagePreview = (props) => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Original Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
                    Original Image
                </h2>

                <div className="h-80 w-full bg-gray-100 flex items-center justify-center">
                    {props.uploaded ? (
                        <img
                            src={props.uploaded}
                            alt="Original"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-500">No Image Selected</div>
                    )}
                </div>
            </div>

            {/* Enhanced Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
                    Enhanced Image
                </h2>

                <div className="h-80 w-full bg-gray-100 flex items-center justify-center">
                    {props.loading ? (
                        <Loading />
                    ) : props.enhanced ? (
                        <img
                            src={props.enhanced}
                            alt="Enhanced"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-500">No Enhanced Image</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;
