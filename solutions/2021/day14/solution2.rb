lines = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines

template = lines[0].chomp
first_pair = template[0..1]
last_pair = template[-2..-1]

template = (1...template.size).each_with_object({}) do |index, h|
  pair = template[index - 1..index]
  h[pair] ||= 0
  h[pair] += 1
end

rules = lines[2..-1].map { |line| line.chomp.split('->').map(&:strip) }.to_h

40.times do
  added_pairs = {}

  template.each do |pair, total|
    next unless rules[pair]

    new_pairs = [pair[0] + rules[pair], rules[pair] + pair[1]]
    first_pair = new_pairs[0] if first_pair == pair
    last_pair = new_pairs[1] if last_pair == pair

    new_pairs.each do |new_pair|
      added_pairs[new_pair] ||= 0
      added_pairs[new_pair] += total
    end

    template.delete(pair)
  end

  added_pairs.each do |added_pair, total|
    template[added_pair] ||= 0
    template[added_pair] += total
  end
end

elements = template.each_with_object({}) do |(pair, total), h|
  pair.chars.each do |char|
    h[char] ||= 0
    h[char] += total
  end
end

elements = elements.map do |char, total|
  single_occurences = 0

  single_occurences += 1 if char == first_pair[0]
  single_occurences += 1 if char == last_pair[1]
  
  [char, single_occurences + (total - single_occurences).fdiv(2).ceil]
end.sort_by(&:last)

puts elements.last.last - elements.first.last