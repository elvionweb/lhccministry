/**
 * Live Stream Embed
 * - Supports YouTube or Facebook Live
 */

export default function LiveStreamEmbed() {
  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.youtube-nocookie.com/embed/live_stream?channel=UC2q1FT2nLnJOHv-d25DcZyg&autoplay=1&rel=0&modestbranding=1"
        title="Live Stream"
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
}
