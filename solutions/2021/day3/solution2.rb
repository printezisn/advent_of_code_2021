def digits_to_num(digits)
  num = 0

  digits.reverse.chars.each_with_index do |digit, index|
    num |= (1 << index) if digit == '1'
  end

  num
end

def compute_rating(lines, type)
  rating = lines
  index = 0

  while rating.size > 1
    total_zeros, total_ones = rating.partition { |digits| digits[index] == '0' }.map(&:size)
    desired_digit = if type == :most_common
                      total_zeros > total_ones  ? '0' : '1'
                    else
                      total_zeros <= total_ones  ? '0' : '1'
                    end

    rating = rating.select { |digits| digits[index] == desired_digit }

    index += 1
  end

  digits_to_num(rating[0])
end

lines = File.read(File.join(File.dirname(__FILE__), 'input.txt')).split

puts compute_rating(lines, :most_common) * compute_rating(lines, :least_common)