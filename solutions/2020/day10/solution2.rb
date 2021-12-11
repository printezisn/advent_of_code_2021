def total_arrangments(ratings, max, arrangement = [], cache = {})
  last = arrangement.last || 0
  return 1 if (max - last) <= 3

  cache[last] ||= begin
    total = 0

    (last + 1..last + 3).each do |rating|
      next unless ratings[rating]

      total += total_arrangments(ratings, max, arrangement + [rating], cache)
    end

    total
  end
end

ratings = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map { |line| [line.to_i, true] }.to_h

puts total_arrangments(ratings, ratings.keys.max + 3)