def arrange(ratings, max, arrangement = [])
  last = arrangement.last || 0
  return (max - last) <= 3 ? arrangement : nil if ratings.empty?

  (last + 1..last + 3).each do |rating|
    next unless ratings[rating]

    new_arrangement = arrange(ratings.except(rating), max, arrangement + [rating])
    return new_arrangement if new_arrangement
  end

  nil
end

ratings = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map { |line| [line.to_i, true] }.to_h
arrangment = arrange(ratings, ratings.keys.max + 3)
arrangment = [0] + arrangment + [arrangment.max + 3]

total_ones = 0
total_threes = 0

arrangment.each_with_index do |rating, index|
  total_ones += 1 if index > 0 && rating - arrangment[index - 1] == 1
  total_threes += 1 if index > 0 && rating - arrangment[index - 1] == 3
end

puts total_ones * total_threes
