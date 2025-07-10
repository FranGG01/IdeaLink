export default function CustomChannelHeader({ friend }) {
    return (
        <div className="bg-gray-800 p-4 border-b border-gray-700 text-white flex items-center gap-2">
            <img
                src={
                    friend.avatar_url ||
                    `https://getstream.io/random_png/?id=${friend.id}`
                }
                alt={friend.username || friend.name}
                className="w-8 h-8 rounded-full"
            />
            <span className="text-lg font-semibold">
                {friend.username || friend.name || "Usuario"}
            </span>
        </div>
    );
}
