def transform_to_digit(output, num_map, matches)
  transformation = output.chars.map { |char| matches[char] }.sort.join
  
  num_map[transformation]
end

def find_matches(occurences, num_map, valid_matches, matches, index = 0)
  current_char = ('a'..'g').to_a[index]
  
  unless current_char
    occurences.each do |occurence|
      return false unless transform_to_digit(occurence, num_map, matches)
    end

    return true
  end

  valid_matches[current_char].each do |char|
    next if matches.values.include?(char)

    matches[current_char] = char

    return true if find_matches(occurences, num_map, valid_matches, matches, index + 1)

    matches[current_char] = nil
  end

  false
end

lines = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map do |line|
  line.split('|').map(&:split)
end

size_map = {
  2 => ['cf'],
  3 => ['acf'],
  4 => ['bcdf'],
  5 => ['acdeg', 'acdfg', 'abdfg'],
  6 => ['abcefg', 'abdefg', 'abcdfg'],
  7 => ['abcdefg']
}

num_map = {
  'abcefg' => 0,
  'cf' => 1,
  'acdeg' => 2,
  'acdfg' => 3,
  'bcdf' => 4,
  'abdfg' => 5,
  'abdefg' => 6,
  'acf' => 7,
  'abcdefg' => 8,
  'abcdfg' => 9
}

total = 0

lines.each do |occurences, outputs|
  matches = {}
  valid_matches = ('a'..'g').map { |char| [char, ('a'..'g').to_a] }.to_h

  occurences.each do |occurence|
    occurence.chars.each do |char|
      valid_matches[char] = valid_matches[char] & size_map[occurence.size].join.chars.uniq
    end
  end

  find_matches(occurences, num_map, valid_matches, matches)

  total += outputs.map { |output| transform_to_digit(output, num_map, matches) }.join.to_i
end

puts total